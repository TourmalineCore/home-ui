import { CardsGridBlock } from "./cards-grid-block";
import { CollageWithLinkBlock } from "./collage-with-link-block";
import { CollageWithTitleBlock } from "./collage-with-title-block";
import { FormBlock } from "./form-block";
import { HeroBlock } from "./hero-block";
import { ProjectBlock, ProjectWithTextBlock } from "./project";
import { ServicesBlock } from "./services-block";
import { SignpostMultipleBlock } from "./signpost-multiple-block";
import { SingleImageBlock } from "./single-image-block";

export type Block = HeroBlock
| ServicesBlock
| CardsGridBlock
| CardsGridBlock
| CollageWithTitleBlock
| CollageWithLinkBlock
| ProjectBlock
| ProjectWithTextBlock
| SignpostMultipleBlock
| SingleImageBlock
| FormBlock;
