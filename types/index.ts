import {SVGProps} from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

type Game= {
  title : string;
  name : string;
  imageUrl : string;
}

export type Games = {
  games : Game[]
}