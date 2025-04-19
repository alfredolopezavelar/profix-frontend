interface Props {
  id: number;
}

const ProviderProfile = ({ id }: Props) => {
  return <h1>Provider Profile for {id}</h1>;
};

export default ProviderProfile;
