import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faMagnifyingGlass, faPlay } from "@fortawesome/free-solid-svg-icons";

library.add(faMagnifyingGlass);
library.add(faPlay);

const SearchIcon = () => <FontAwesomeIcon icon="fa-solid fa-magnifying-glass" />
const PlayIcon = () => <FontAwesomeIcon icon="fa-solid fa-play" />

export { 
    SearchIcon, PlayIcon
}