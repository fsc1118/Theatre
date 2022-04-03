import {Main} from './component/main';
import {SeatPicker} from './component/SeatPicker/SeatPicker'

export let App = ()=> {
  return (
    <div className="App">
        <SeatPicker />
        <Main/>
    </div>
  );
}

