export interface IImage {
  type: 'image';
  imageLabel?: string;
  imageLink: { desktop: string; tablet: string };
  columns: 1 | 2;
}

export interface ISlider {
  type: 'slider';
  images: { imageLink: { desktop: string; tablet: string }; imageLabel: string }[];
  columns: 2;
}

export interface IText {
  type: 'text';
  textContent: string;
  columns: 1 | 2;
}

export type ContentType = IImage | IText | ISlider;

export interface IPage {
  title: string;
  content: ContentType[];
}

export interface IEvent {
  _id: string;
  title: string;
  banner: string;
  isBanner: boolean;
  imgSrc: string;
  description: string;
  begin: string;
  start: string;
  end: string;
  shortDec: string;
  slug: string;
  summary: string;
  created: Date; //дата створення події
  content: ContentType[];
}

export interface IMuseumEventData {
  totalElements: number;
  content: IEvent[];
}

export interface IMuseumData {
  id: string;
  tel: string;
  email: string;
  underground: string;
  bus: string;
  funicular: string;
}

export interface IFormInput {
  firstName: string;
  lastName: string;
  email: string;
  message: string;
}

export interface IAdmin {
  //ToDo: change interface due to backend response
  id: string;
  name: string;
}

export interface IImage {
  alt: string;
  asset: {
    _ref: string;
  };
  _key: string;
}
interface IIGallery extends IImage {
  photoLayout: {
    cols: number;
    rows: number;
  };
  title: string;
}
export interface IPortableImgGallery {
  value: {
    images: IIGallery[];
    title: string;
    option: boolean;
  };
}
