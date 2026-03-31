export const TableSkeleton = () => {

  return (
    <>
      {Array.from({ length: 5 }).map((_, i) => (
        <tr key={i} className="border-b border-padsa-border">
          {Array.from({ length: 7 }).map((_, j) => (
            <td key={j} className="px-6 py-4">
              <div className="h-4 bg-gray-700/40 rounded animate-pulse" />
            </td>
          ))}
        </tr>
      ))}
    </>
  );

};