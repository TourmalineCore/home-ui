import {
  SharedCollageWithTitleComponent,
  SharedFeaturedCardsListComponent,
  SharedHeroComponent,
  SharedSignpostMultipleComponent,
  SharedSingleImageComponent,
  SharedCollageWithLinkComponent,
} from "../api-types";

export type BlockApi = SharedHeroComponent
| SharedFeaturedCardsListComponent
| SharedCollageWithTitleComponent
| SharedSignpostMultipleComponent
| SharedSingleImageComponent
| SharedCollageWithLinkComponent;
