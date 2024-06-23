import React from 'react';


const ErrorFallback = ({error, resetErrorBoundary}) => (
    <div role="alert">
        <p>TODO: à voir avec les designers Edenred</p>
        <p>Something went wrong:</p>
        <pre>{error.message}</pre>
        <button onClick={resetErrorBoundary}>Try again</button>
    </div>
);

export default ErrorFallback;