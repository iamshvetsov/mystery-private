import "@stdlib/deploy";
import "./messages.tact";
import "./positions.tact";

contract MysteryPrivate with Deployable {
    const gasConsumption: Int = ton("0.05");

    owners: map<Address, Address>;

    receive(msg: OpenPosition) {
        let body = InternalOpenPosition{
            sender: sender(),
            token: msg.token,
            entryPrice: msg.entryPrice,
            amount: msg.amount,
            liquidationPrice: msg.liquidationPrice
        }.toCell();

        if (self.owners.get(sender()) == null) {
            let init: StateInit = initOf Positions(myAddress(), sender());
            let address: Address = contractAddress(init);

            self.owners.set(sender(), address);

            send(SendParameters{
                to: address,
                body: body,
                value: self.gasConsumption,
                mode: SendIgnoreErrors,
                code: init.code,
                data: init.data
            });
        } else {
            send(SendParameters{
                to: self.owners.get(sender())!!,
                body: body,
                value: self.gasConsumption,
                mode: SendIgnoreErrors
            });
        }
    }

    receive(msg: ClosePosition) {
        require(self.owners.get(sender()) != null, "There is no such owner");

        send(SendParameters{
            to: self.owners.get(sender())!!,
            body: InternalClosePosition{
                sender: sender(),
                seqno: msg.seqno,
                markPrice: msg.markPrice
            }.toCell(),
            value: self.gasConsumption,
            mode: SendIgnoreErrors
        });

        send(SendParameters{
            to: sender(),
            value: msg.value - self.gasConsumption,
            mode: SendRemainingValue + SendIgnoreErrors
        });
    }

    receive(msg: LiquidatePosition) {
        require(self.owners.get(sender()) != null, "There is no such owner");

        send(SendParameters{
            to: self.owners.get(sender())!!,
            body: InternalLiquidatePosition{
                sender: sender(),
                seqno: msg.seqno,
                markPrice: msg.markPrice
            }.toCell(),
            value: self.gasConsumption,
            mode: SendIgnoreErrors
        });
    }

    get fun positionsAddress(owner: Address): Address? {
        return self.owners.get(owner);
    }
}
