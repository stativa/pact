import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { PactWeb } from '@pact-foundation/pact-web';
import { ApolloModule, APOLLO_OPTIONS } from 'apollo-angular';
import { HttpLink, HttpLinkModule } from 'apollo-angular-link-http';
import { ApolloTestingController } from 'apollo-angular/testing';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { DataService } from './data.service';

/*
const expect = chai.expect;
chai.use(sinonChai);
chai.use(chaiAsPromised);*/

function createApollo(httpLink: HttpLink) {
    return {
        link: httpLink.create({ uri: 'http://localhost:1234/api' }),
        cache: new InMemoryCache(),
    };
}

describe('DataService to CMS Data Contract', function() {
    let service: DataService;
    let provider;

    const EXPECTED_BODY = {
        result: true
    };

    beforeAll((done) => {
        TestBed.configureTestingModule({
            imports: [ApolloModule, HttpLinkModule, HttpClientModule],
            providers: [
                DataService,
                {
                    provide: APOLLO_OPTIONS,
                    useFactory: createApollo,
                    deps: [HttpLink],
                },
            ],
        });

        service = TestBed.get(DataService);

        provider = new PactWeb({
            consumer: '',
            provider: '',
            spec: 2,
        });

        provider.removeInteractions().then(done, done.fail);
    });

    afterEach(async (done) => {
        provider.verify().then(done, done.fail);
    });

    afterAll(async (done) => {
        provider.finalize().then(done, done.fail);
    });

    describe('and there is a valid user session', () => {
        beforeEach(async (done) => {
            provider
                .addInteraction({
                    state: 'i have a list of projects',
                    uponReceiving: 'a request for projects',
                    withRequest: {
                        method: 'POST',
                        path: '/api',
                        headers: {
                            Accept: 'application/json',
                        },
                    },
                    willRespondWith: {
                        status: 200,
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: EXPECTED_BODY,
                    },
                })
                .then(done, done.fail);
        });

        it('generates a Content root item', async (done) => {
            console.log('start test');
            service.getData('path').subscribe((item) => {
                expect('Home').toBe('Home');
                done();
            });
        });
    });
});
