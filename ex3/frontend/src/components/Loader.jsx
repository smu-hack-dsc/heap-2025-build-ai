// YOU DO NOT NEED TO TOUCH THIS FILE

import { waveform } from 'ldrs';

waveform.register();

const Loader = () => {
  return (
    <div className="flex justify-center items-center h-screen">
        <l-waveform size="50" bg-opacity="0.1" speed="1" color="#3266D3"></l-waveform>
    </div>
    
  );
};

export default Loader;