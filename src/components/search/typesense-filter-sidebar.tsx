import { Panel, SortBy, RefinementList } from 'react-instantsearch';

interface Item {
  label: string;
  value: string;
  count: number;
  isRefined: boolean;
}

const TypesenseFilter = () => (
  <aside className="results-section">
    <Panel header="Sort By">
    <SortBy
        items={[
            { label: "Default", value: "animes" },
            {
            label: "ranked (asc)",
            value: "animes/sort/popularity:asc",
            },
            {
            label: "ranked (desc)",
            value: "animes/sort/popularity:desc",
            },
        ]}
        defaultRefinement="animes"
        />
    </Panel>
    <Panel header="Genre">
      <RefinementList
        attribute="genre"
        transformItems={(items: Item[]) =>
          items.map((item: Item) => ({
            ...item,
            label: item.label.slice(2, -2),
          }))
        }
        searchable={true}
        showMore={true}
        limit={10}
        showMoreText="Show more"
        showLessText="Show less"
      />
    </Panel>
    <Panel header="Aired">
      <RefinementList attribute="aired" />
    </Panel>
  </aside>
);

export default TypesenseFilter;