import { Skeleton } from "@/components/ui/skeleton";

export const HistoryDetailsSkeleton = () => {
  return (
    <>
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <Skeleton className="h-4 w-[150px]" />
        <Skeleton className="h-4 w-[120px]" />
      </div>

      {/* Origin -> Dest Title */}
      <div className="flex items-center gap-2 mt-4">
        <Skeleton className="h-8 w-[250px]" />
      </div>

      {/* Location details */}
      <div className="flex items-center justify-between gap-4 mt-6">
        <div className="flex-1">
          <Skeleton className="h-3 w-[100px]" />
          <Skeleton className="h-5 w-[140px] mt-2" />
        </div>
        <div className="flex-1 sm:text-right flex flex-col items-end">
          <Skeleton className="h-3 w-[100px]" />
          <Skeleton className="h-5 w-[140px] mt-2" />
        </div>
      </div>

      {/* Map Placeholder */}
      <Skeleton className="w-full h-70 rounded-2xl mt-6" />

      {/* Comparison Results */}
      <div className="flex flex-col mt-6">
        <div className="flex items-center justify-between mb-4">
          <Skeleton className="h-5 w-[150px]" />
          <Skeleton className="h-3 w-[100px]" />
        </div>

        <div className="flex flex-col border border-border/80 rounded-xl overflow-hidden divide-y divide-border/60">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center gap-3 py-3 px-4 sm:px-5">
              <Skeleton className="w-10 h-10 rounded-xl" />
              <div className="flex flex-col gap-1.5 flex-1">
                <Skeleton className="h-4 w-[100px]" />
                <Skeleton className="h-3 w-[150px]" />
              </div>
              <div className="flex flex-col items-end gap-1.5">
                <Skeleton className="h-4 w-[60px]" />
                <Skeleton className="h-6 w-[80px] rounded-full" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
