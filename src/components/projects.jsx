import styles from './projects.module.css'
import React, { useState, useEffect } from 'react';
import { FaTimes } from 'react-icons/fa';
import { RiDeleteBinLine } from 'react-icons/ri'


const ProjectsDiv = () => {
  const [nome, setNome] = useState('');
  const [tipo, setTipo] = useState('');
  const [valor, setValor] = useState('');
  const [orçamentos, setOrçamentos] = useState(
      JSON.parse(localStorage.getItem('orçamentos')) || []
    );
  const getOrçamentos = () => {
    return orçamentos;
  };



    
  const adicionarOrçamento = () => {
      const novoOrçamento = { id: Date.now(), nome, tipo, valor }; // Adicionando um ID único
      const novosOrçamentos = [...orçamentos, novoOrçamento];
      setOrçamentos(novosOrçamentos);
      localStorage.setItem('orçamentos', JSON.stringify(novosOrçamentos));
      setNome('');
      setTipo('');
      setValor('');
      window.location.reload()
  };

    const apagarOrçamento = (id) => {
      const confirmarExclusao = window.confirm('Tem certeza que deseja excluir este orçamento?');
      if (confirmarExclusao) {
        const novosOrçamentos = orçamentos.filter(orçamento => orçamento.id !== id);
        setOrçamentos(novosOrçamentos);
        localStorage.setItem('orçamentos', JSON.stringify(novosOrçamentos));
      }
      window.location.reload()
    };

    useEffect(() => {
      const orçamentosSalvos = JSON.parse(localStorage.getItem('orçamentos')) || [];
      setOrçamentos(orçamentosSalvos);
      console.log('Orçamentos recuperados do localStorage:', orçamentosSalvos);
    }, []);
    const getColorByType = (type) => {
      switch (type) {
        case 'Desenvolvimento':
          return '#8d85ff';
        case 'Expansão':
          return '#85ffae';
        case 'Otimização':
          return '#ff85c8';
        case 'Gestão':
          return '#ff8585';
      }
    };


    const [isVisible, setIsVisible] = useState(true);
    const toggleVisibility = () => {
      setIsVisible(!isVisible);
    };

    const orçamentosInvertidos = [...orçamentos].reverse();

    const [projetoSelecionado, setProjetoSelecionado] = useState(null);

    return (
        <div className={styles.projects}>
            <div onClick={toggleVisibility} className={styles.addProjectDiv}>
                <h1>+</h1>
            </div>
            <div className={styles.projetos}>
              <ul>
                  {orçamentosInvertidos.map((orçamento, index) => (
                    <div onClick={() => setProjetoSelecionado(true)} className={styles.projeto} key={orçamentos.id}>
                        <span /*style={{ color: getColorByType(orçamento.tipo) }}*/ className={styles.nome}>{orçamento.nome}
                        </span>
                        <span className={styles.valor}>Budget: ${orçamento.valor}</span>
                        <div className={styles.desen}>
                          <div style={{ backgroundColor: getColorByType(orçamento.tipo) }} className={styles.bola}></div>
                          <span className={styles.tipo}>{orçamento.tipo}</span> 
                        </div>
                        <button className={styles.btn1} onClick={() => apagarOrçamento(orçamento.id)}><RiDeleteBinLine /></button>
                    </div>
                  ))}
              </ul>
            </div>

            <div className={styles.popup} style={{ visibility: isVisible ? 'hidden' : 'visible' }}>
              <div className={styles.x} onClick={toggleVisibility}><FaTimes /></div>
              <h3 className={styles.NP}>New Project</h3> 
              <form className={styles.form}>
                <label>Project name:</label>
                <input value={nome} onChange={(e) => setNome(e.target.value)} className={styles.input2} type="text" />
                <label>Budget:</label>
                <input value={valor} onChange={(e) => setValor(e.target.value)} className={styles.input1} type="number" />
                <label>Type:</label>
                <select className={styles.select} value={tipo} onChange={(e) => setTipo(e.target.value)} name="" id="">
                  <option value="Nenhum">Nenhum</option>
                  <option value="Desenvolvimento">Desenvolvimento</option>
                  <option  value="Expansão">Expansão</option>
                  <option  value="Otimização">Otimização</option>
                  <option  value="Gestão">Gestão</option>
                </select>
                <button className={styles.btnPopup} onClick={adicionarOrçamento} type='submit'>Save</button>
             </form>           
            </div>



        </div>
    )
}

export default ProjectsDiv
