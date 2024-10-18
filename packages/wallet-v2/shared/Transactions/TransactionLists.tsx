import EmptyBox from '@/assets/images/empty-box.svg';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import Transaction from './Transaction';
import Image from 'next/image';
import { TransactionType } from '@/types';

interface TransactionListProps {
  transactions: TransactionType[];
}

const TransactionList: React.FC<TransactionListProps> = ({ transactions }) => {
  if (transactions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[300px]">
        <div className="w-24 h-24  rounded-lg mb-4 flex items-center justify-center">
        <Image src={EmptyBox} width={120} height={120} className="w-[120px]" alt="Empty Boxes" />
        </div>
        <p className="text-[#FFFFFF52] font-semibold">No transaction found!</p>
      </div>
    );
  }

  return (
    <ScrollArea className="h-[300px] max-h-[428px] w-full">
      {transactions.map((tx, index) => (
        <Transaction key={index} tx={tx} />
      ))}
    </ScrollArea>
  );
};

export default TransactionList;