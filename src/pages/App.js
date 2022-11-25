import gitLogo from '../assets/github.png'
import Input from '../components/input';
import { Container } from './styles';

function App() {
  return (
    <Container>
      <img src={gitLogo} alt='logo-git' width={72} height={72} />
      <Input />
    </Container>
  );
}

export default App;
