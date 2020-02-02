import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { APOLLO_OPTIONS, ApolloModule } from 'apollo-angular';
import { AppComponent } from './app.component';
import { HttpLink, HttpLinkModule } from 'apollo-angular-link-http';
import { InMemoryCache, IntrospectionFragmentMatcher } from 'apollo-cache-inmemory';
import { DataService } from './services/data.service';
import { HttpClientModule } from '@angular/common/http';

/**
 * Solution was taken from the following link:
 * https://github.com/apollographql/apollo-client/issues/3397
 */
export const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData: {
      __schema: {
          types: [],
      },
  },
});

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    ApolloModule,
    HttpClientModule,
    HttpLinkModule,
  ],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: (httpLink: HttpLink) => {
          return {
              cache: new InMemoryCache({ fragmentMatcher }),
              link: httpLink.create({
                  uri: '/api',
              }),
              defaultOptions: {
                  watchQuery: {
                      fetchPolicy: 'no-cache',
                      errorPolicy: 'all',
                  },
              },
          };
      },
      deps: [HttpLink],
    },
    DataService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
