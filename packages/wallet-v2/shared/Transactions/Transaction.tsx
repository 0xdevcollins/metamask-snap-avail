import { Send } from "atomize_icons";

const Transaction = ({ tx }) => {
  return (
    <div className="bg-[#FFFFFF12] rounded-xl p-3 mb-2">
      <div className="flex items-center mb-2">
        <Send className="text-white mr-1" />
        <span className="text-white font-semibold">{tx.type}</span>
        {tx.amount && <span className="ml-auto text-white font-semibold">{tx.amount}</span>}
      </div>
      {tx.from && (
        <p className="text-sm text-[#FFFFFFC2]">
          From <span className="font-semibold text-white">{tx.from}</span> to <span className="font-semibold text-white">{tx.to}</span>
        </p>
      )}
      {tx.txHash && (
        <p className="text-sm text-[#FFFFFFC2]">
          Tx hash: <span className="font-semibold text-white">{tx.txHash}</span>
        </p>
      )}
    </div>
  );
};

export default Transaction;