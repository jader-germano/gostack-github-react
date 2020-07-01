import React, { useEffect } from 'react';
import { FiChevronRight } from 'react-icons/fi';
import { useRouteMatch, Link } from 'react-router-dom';
import { FiChevronLeft } from 'react-icons/all';
import api from '../../services/api';
import { Header, RepositoryInfo, Issues } from './styles';

import logo from '../../assets/logo.svg';

interface RepositoryParams {
    repository: string;
}
const Repository: React.FC = () => {
    const { params } = useRouteMatch<RepositoryParams>();
    useEffect(() => {
        api.get(`/repos/${params.repository}`).then(response => {
            console.log();
        });
        api.get(`/repos/${params.repository}/issues`).then(response => {
            console.log();
        });
    }, [params.repository]);
    return (
        <>
            <Header>
                <img src={logo} alt="Github Explorer" />
                <Link to="/dashboard">
                    <FiChevronLeft size={16} />
                    Voltar
                </Link>
            </Header>

            <RepositoryInfo>
                <header>
                    <img
                        src="https://avatars3.githubusercontent.com/u/34477944?s=460&u=25760c72e64de2fb76f8ec919bc1440b803bdde8&v=4"
                        alt="Git Hub"
                    />
                    <div>
                        <strong>Nome</strong>
                        <p>Desc</p>
                    </div>
                </header>
                <ul>
                    <li>
                        <strong>1800</strong>
                        <span>Star</span>
                    </li>
                    <li>
                        <strong>1800</strong>
                        <span>Forks</span>
                    </li>
                    <li>
                        <strong>1800</strong>
                        <span>Issues Abertas</span>
                    </li>
                </ul>
            </RepositoryInfo>
            <Issues>
                <Link key="" to={`/repository/${''}`}>
                    <div>
                        <strong />
                        <p />
                    </div>
                    <FiChevronRight size={20} />
                </Link>
            </Issues>
        </>
    );
};

export default Repository;
