import Link from "@/components/ui/link";
import React from "react";

export const Author = ({ author, className, rowClass }) => {
  const authors = author.trim().split(/[,;]/).filter((authorName: string) => authorName.trim());
  return (
    <tr className={className}>
      <td className={rowClass}>
        {'Authors'}:
      </td>
      <td>
        {authors.map((authorName: string, index: number, array: string[]) => (
          <React.Fragment key={authorName}>
            <Link 
              className="text-blue-700 underline hover:no-underline"
              href={`/author/${authorName.trim()}`}
            >
              {authorName}
            </Link>
            {index < array.length - 1 && ', '}
          </React.Fragment>
        ))}
      </td>
    </tr>
  );
};