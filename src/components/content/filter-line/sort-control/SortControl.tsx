import "./SortControl.css";
import {SortByOption} from "../../../../constants/sort-control-const";
import {SortControlData} from "../../../../models/sortControl";

function SortControl({currentSorting, onSortChanged}: SortControlData) {
    const onSortChange = (event: any)=> {
        onSortChanged(event.target.value);
    }

    return (
        <div className="sort-by-block" data-testid="sort-control">
            <span className="sort-by-text">SORT BY</span>
            <select className="sort-by-dropdown"
                    value={currentSorting}
                    onChange={onSortChange}
                    data-testid="sort-select"
            >
                <option key={SortByOption.ReleaseDate}
                        value={SortByOption.ReleaseDate}
                >{SortByOption.ReleaseDate}</option>
                <option key={SortByOption.Title}
                        value={SortByOption.Title}
                >{SortByOption.Title}</option>
            </select>
        </div>
    );
}

export default SortControl;
