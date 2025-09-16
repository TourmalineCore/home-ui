import {
  SharedCollageWithTitleComponent,
  SharedFeaturedCardsListComponent,
  SharedHeroComponent,
  SharedSignpostMultipleComponent,
  SharedSingleImageComponent,
  SharedThreeColumnGridComponent,
  SharedCollageWithLinkComponent,
} from "../api-types";

export type BlockApi = SharedHeroComponent
| SharedFeaturedCardsListComponent
| SharedCollageWithTitleComponent
| SharedSignpostMultipleComponent
| SharedSingleImageComponent
| SharedThreeColumnGridComponent
| SharedCollageWithLinkComponent;
