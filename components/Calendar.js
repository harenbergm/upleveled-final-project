// import 'react-big-calendar/lib/css/react-big-calendar.css';
// import 'react-datepicker/dist/react-datepicker.css';
// import 'add-to-calendar-button/assets/css/atcb.css';
// import { css } from '@emotion/react';
// import { atcb_action, atcb_init } from 'add-to-calendar-button';
// import format from 'date-fns/format';
// import getDay from 'date-fns/getDay';
// import parse from 'date-fns/parse';
// import startOfWeek from 'date-fns/startOfWeek';
// import DatePicker from 'react-datepicker';

// export default function Calender() {
//   const [newEvent, setNewEvent] = useState({ title: '', start: '', end: '' });
//   const [allEvents, setAllEvents] = useState([]);

//   function handleAddEvents() {
//     setAllEvents([...allEvents, newEvent]);
//   }

//   return (
//     <div>
//       <div css={calendarStyles}>
//         <h2>Join me on my cooking classes!</h2>
//         <h3>Add new cooking class</h3>
//         <div>
//           <input
//             placeholder="Add cooking event"
//             style={{ width: '20%', marginRight: '20px' }}
//             value={newEvent.title}
//             onChange={(event) => {
//               setNewEvent({ ...newEvent, title: event.target.value });
//             }}
//           />
//           <div>
//             <DatePicker
//               placeholderText="Start Date"
//               style={{ marginRight: '10px' }}
//               selected={newEvent.start}
//               onChange={(start) => {
//                 setNewEvent({ ...newEvent, start });
//               }}
//             />
//           </div>
//           <div>
//             <DatePicker
//               placeholderText="End Date"
//               selected={newEvent.end}
//               onChange={(end) => {
//                 setNewEvent({ ...newEvent, end });
//               }}
//             />
//           </div>
//           <div>
//             <button style={{ marginTop: '10px' }} onClick={handleAddEvents}>
//               Add cooking class
//             </button>
//           </div>
//         </div>
//       </div>
//       <form
//         onSubmit={(e) => {
//           e.preventDefault();
//           atcb_action({
//             name: newEvent.title,
//             startDate: newEvent.start,
//             endDate: newEvent.end,
//             options: [
//               'Apple',
//               'Google',
//               'iCal',
//               'Microsoft365',
//               'Outlook.com',
//               'Yahoo',
//             ],
//             timeZone: 'Europe/Berlin',
//             iCalFileName: 'Reminder-Event',
//           });
//         }}
//       >
//         <select
//           onChange={(event) => {
//             setDifficulty(event?.target.value);
//           }}
//         >
//           {allEvents.map((event) => {
//             return <option value={event.title}>{event.title}</option>;
//           })}
//         </select>
//         {/* <input value={newEvent.title} onChange={newEvent.title} /> */}
//         <input type="submit" value="save" />
//       </form>

//       <Calender
//         localizer={localizer}
//         events={allEvents}
//         startAccessor="start"
//         endAccessor="end"
//         style={{ height: 500, margin: '50px' }}
//       />
//     </div>
//   );
// }
