import { Skeleton } from "@/components/ui/skeleton";

export const ComparisonCardSkeleton = () => {
  return (
    <div className="flex items-center justify-between p-4 px-5 bg-white rounded-2xl border border-slate-100 mb-3">
      {/* LEFT SIDE: Icon + Texts */}
      <div className="flex items-center gap-5">
        <Skeleton className="w-12 h-12 rounded-2xl" />
        <div className="flex flex-col gap-2">
          <Skeleton className="h-4 w-35" />
          <Skeleton className="h-3 w-25" />
        </div>
      </div>

      {/* RIGHT SIDE: Price + Badge */}
      <div className="flex flex-col items-end gap-2">
        <Skeleton className="h-4 w-15" />
        <Skeleton className="h-5 w-20 rounded-md" />
      </div>
    </div>
  );
};
