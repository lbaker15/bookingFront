const Title = ({ titles, i, field }: any) => {
  return (
    <span className='font-sans font-light' ref={(el) => (titles.current[i] = el)}>
      {field}
    </span>
  );
};
export default Title;
