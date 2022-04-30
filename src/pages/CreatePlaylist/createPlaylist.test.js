import { render, screen } from '@testing-library/react';
import CreatePlaylist from './index';
import { Provider } from 'react-redux';
import store from '../../store.tsx';

describe('Create Playlist', () => {
    test("page randered", () => {
        render(
            <Provider store={store}>
                    <CreatePlaylist />
            </Provider>
        );
        const titlePage = screen.getByText('Create Your Playlist !');
        const searchInput = screen.getByTestId('input-search');
        const searchButton = screen.getByTestId('button-search');
        
        expect(titlePage).toBeInTheDocument();
        expect(searchInput).toBeInTheDocument();
        expect(searchButton).toBeInTheDocument();
    })
});