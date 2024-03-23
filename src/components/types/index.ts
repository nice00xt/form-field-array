export type ItemProps = {
  id: string;
  name: string;
  last_name: string;
  _destroy?: string;
  form_id?: string;
};

export type FormValues = {
  items: {
    id: string;
    name: string;
    last_name: string;
    _destroy?: string;
  }[];
};

export type OverviewProps = {
  values: {
    items: ItemProps[];
  }
};