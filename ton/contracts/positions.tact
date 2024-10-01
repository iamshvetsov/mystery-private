import "@stdlib/deploy";
import "./messages.tact";

struct Position {
    seqno: Int as uint256;
    token: Address;
    entryPrice: Int as coins;
    amount: Int as coins;
    liquidationPrice: Int as coins;
    status: String;
    closePrice: Int as coins;
}

contract Positions with Deployable {
    parent: Address;
    owner: Address;
    numPositions: Int as uint256 = 0;
    positions: map<Int, Position>;

    init(parent: Address, owner: Address) {
        self.parent = parent;
        self.owner = owner;
    }

    receive(msg: InternalOpenPosition) {
        require(sender() == self.parent, "This method could be called only by the parent");
        require(msg.sender == self.owner, "This method could be called only by the owner");
        require(msg.liquidationPrice == 2 * msg.entryPrice, "This position has an incorrect liquidation price");

        self.numPositions = self.numPositions + 1;

        self.positions.set(self.numPositions, Position{
            seqno: self.numPositions,
            token: msg.token,
            entryPrice: msg.entryPrice,
            amount: msg.amount,
            liquidationPrice: msg.liquidationPrice,
            status: "Open",
            closePrice: 0
        });
    }

    receive(msg: InternalClosePosition) {
        require(sender() == self.parent, "This method could be called only by the parent");
        require(msg.sender == self.owner, "This method could be called only by the owner");
        require(msg.seqno <= self.numPositions, "There is no such position");

        let position: Position = self.positions.get(msg.seqno)!!;

        require(position.status == "Open", "This position has already closed");

        self.positions.set(msg.seqno, Position{
            seqno: position.seqno,
            token: position.token,
            entryPrice: position.entryPrice,
            amount: position.amount,
            liquidationPrice: position.liquidationPrice,
            status: "Close",
            closePrice: msg.markPrice
        });
    }

    receive(msg: InternalLiquidatePosition) {
        require(sender() == self.parent, "This method could be called only by the parent");
        require(msg.sender == self.owner, "This method could be called only by the owner");
        require(msg.seqno <= self.numPositions, "There is no such position");

        let position: Position = self.positions.get(msg.seqno)!!;

        require(position.liquidationPrice == msg.markPrice, "This position has a margin");

        self.positions.set(msg.seqno, Position{
            seqno: position.seqno,
            token: position.token,
            entryPrice: position.entryPrice,
            amount: position.amount,
            liquidationPrice: position.liquidationPrice,
            status: "Liquidate",
            closePrice: position.liquidationPrice
        });
    }

    get fun numPositions(): Int {
        return self.numPositions;
    }

    get fun positions(): map<Int, Position> {
        return self.positions;
    }
}
