import Footer from './Footer';
import Header from './Header';

export default function Layout(props) {
  return (
    <div>
      <Header user={props.user} />
      {props.children}
      {/* <Footer /> */}
    </div>
  );
}
