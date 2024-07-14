import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

export const httpMock = new MockAdapter(axios);
