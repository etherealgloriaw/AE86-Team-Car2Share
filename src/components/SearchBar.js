import "./style/searchbar.css"

export const SearchBar = () => {
    return (
        <div className="search_bar">
            <form>
                <div>
                    <label htmlFor="starting_point">From</label>
                    <textarea id="starting_point"  rows="1" cols="20"></textarea>
                </div>
                <div>
                    <label htmlFor="destination">To</label>
                    <textarea id="destination"   rows="1" cols="20"></textarea>
                </div>
                
            </form>
        </div>

    )
}