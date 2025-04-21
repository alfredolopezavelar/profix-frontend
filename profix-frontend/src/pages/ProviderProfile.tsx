interface Props {
  id: string;
}

const ProviderProfile = ({ id }: Props) => {
  return <h1>Provider Profile for string {id}</h1>;
};

export default ProviderProfile;
