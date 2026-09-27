import { Skeleton } from "@/components/ui/skeleton";

export const HistoryListSkeleton = () => {
  return (
    <div className="p-5 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <Skeleton className="w-10 h-10 rounded-xl" />
        <div className="flex flex-col gap-2">
          <Skeleton className="h-4 w-[200px]" />
          <Skeleton className="h-3 w-[150px]" />
        </div>
      </div>
      <div className="flex flex-col items-end gap-2">
        <Skeleton className="h-3 w-[60px]" />
        <Skeleton className="h-4 w-[80px]" />
      </div>
    </div>
  );
};
