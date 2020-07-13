import React, { useEffect, useState } from 'react';
import { FiChevronRight } from 'react-icons/fi';
import { useRouteMatch, Link } from 'react-router-dom';
import { FiChevronLeft } from 'react-icons/all';
import api from '../../services/api';
import { Header, RepositoryInfo, Issues } from './styles';

import logo from '../../assets/logo.svg';

interface RepositoryParams {
    repository: string;
}

interface Repository {
    full_name: string;
    description: string;
    stargazers_count: number;
    forks_count: number;
    open_issues_count: number;
    owner: {
        login: string;
        avatar_url: string;
    };
}

interface Issues {
    id: number;
    title: string;
    user: {
        login: string;
    };
    html_url: string;
}
const Repository: React.FC = () => {
    const { params } = useRouteMatch<RepositoryParams>();
    const [repositoryDetail, setRepositoryDetail] = useState<Repository | null>(null);
    const [issuesDetail, setIssuesDetail] = useState<Issues[]>([]);

    useEffect(() => {
        api.get<Repository>(`repos/${params.repository}`).then((response) => {
            setRepositoryDetail(response.data);
        });
        api.get<Issues[]>(`repos/${params.repository}/issues`).then((response) => {
            setIssuesDetail(response.data);
        });
    }, [params.repository]);
    return (
        <>
            <Header>
                <img src={logo} alt="Github Explorer" />
                <Link to="/">
                    <FiChevronLeft size={16} />
                    Voltar
                </Link>
            </Header>
            {repositoryDetail && (
                <RepositoryInfo>
                    <header>
                        <img src={repositoryDetail.owner.avatar_url} alt={repositoryDetail.owner.login} />
                        <div>
                            <strong>{repositoryDetail.full_name}</strong>
                            <p>{repositoryDetail.description}</p>
                        </div>
                    </header>
                    <ul>
                        <li>
                            <strong>{repositoryDetail.stargazers_count}</strong>
                            <span>Star</span>
                        </li>
                        <li>
                            <strong>{repositoryDetail.forks_count}</strong>
                            <span>Forks</span>
                        </li>
                        <li>
                            <strong>{repositoryDetail.open_issues_count}</strong>
                            <span>Issues Abertas</span>
                        </li>
                    </ul>
                </RepositoryInfo>
            )}
            {issuesDetail.map((issue) => (
                <Issues>
                    <a key={issue.id} href={issue.html_url}>
                        <div>
                            <strong>{issue.title}</strong>
                            <p>{issue.user.login}</p>
                        </div>
                        <FiChevronRight size={20} />
                    </a>
                </Issues>
            ))}
        </>
    );
};

export default Repository;
