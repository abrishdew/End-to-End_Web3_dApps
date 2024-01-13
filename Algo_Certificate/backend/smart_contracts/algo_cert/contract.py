import beaker
import pyteal as pt

app = beaker.Application("algo_cert")


@app.external
def hello(name: pt.abi.String, *, output: pt.abi.String) -> pt.Expr:
    return output.set(pt.Concat(pt.Bytes("Hello, "), name.get()))


@app.external
def opt_in() -> pt.Expr:
    sender = pt.Txn.sender()
    already_opted_in = pt.App.globalGet(sender)
    opt_in_logic = pt.Seq(
        [
            pt.Assert(pt.Not(already_opted_in)),
            pt.App.globalPut(sender, pt.Int(1)),
            pt.Approve(),
        ]
    )
    return opt_in_logic
