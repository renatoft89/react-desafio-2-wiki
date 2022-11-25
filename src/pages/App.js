import { useState } from 'react';
import gitLogo from '../assets/github.png'
import Button from '../components/Button';
import Input from '../components/input';
import ItemRepo from '../components/ItemRepo';
import { Container } from './styles';
import { api } from '../services/api';

function App() {

  const [currentRepo, setCurrentRepo] = useState('');
  const [repos, setRepos] = useState([]);

  const handleSearchRepo = async () => {
    const { data } = await api.get(`repos/${currentRepo}`)
    .catch((error) => {
      return alert('Repositório não encontrado')
    })
    
    if (data.AxiosError) {
      return alert('Repositório não encontrado')      
    }

    if (data.id) {
      const isExist = repos.find((repo) => (repo.id === data.id));

      if (!isExist) {
        setRepos(prev => [...prev, data]);
        setCurrentRepo('')
        return
      } else {
        alert('Esse Repositório já existe')
      }
    }
  }

  const handleRemoveRepo = (id) => {
    
    const removed = repos.filter((repo) => repo.id !== id)
    console.log(removed, id);
    setRepos(removed)
  }

  return (
    <Container>
      <img src={gitLogo} alt='logo-git' width={72} height={72} />
      <
        Input 
        value={currentRepo} 
        onChange={(event) => setCurrentRepo(event.target.value)}
      />
      <Button onClick={handleSearchRepo}/>
      {
        repos.map((repo) => {
          return < ItemRepo 
            repo={repo}
            handleRemoveRepo={handleRemoveRepo}
          />
        })
      }

    </Container>
  );
}

export default App;
