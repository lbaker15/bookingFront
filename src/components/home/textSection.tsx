import TextAnimation from './textAnimation';

const TextSection = ({ data }: any) => {
  return (
    <div className='u-wrapper'>
      {data.acf.text.map((item: any, i: number) => {
        if (i === 2)
          return <TextAnimation key={'textAnim' + i} string={item.row} heading={'p'} clip={true} classes='w-full text-xl flex flex-col items-end mt-16' />;
        if (i === 1) {
          return <TextAnimation key={'textAnim' + i} classes='w-full lg:w-1/2  uppercase pr-4 text-4xl mb-8' string={item.row} heading={3} />;
        }
        return <TextAnimation key={'textAnim' + i} classes='w-full lg:w-1/2 uppercase pr-4 text-6xl mb-6' string={item.row} heading={2} />;
      })}
    </div>
  );
};

export default TextSection;
