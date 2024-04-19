export const columns = [{
  category: 'JavaScript',
  items: [{
    answer: 'One iterates over the keys of an object, the other iterates over the values.',
    question: 'What is the difference between for..in and for..of',
  }, {
    answer: 'This keyword refers to the object that is executing the current function.',
    question: 'What is `this`',
  }, {
    answer: 'The behavior where variable and function declarations are moved to the top of their respective scopes during the compilation phase, before the code is executed.',
    question: 'What is hoisting',
  }, {
    answer: 'This syntax consists of two main keywords: `import` and `export`.',
    question: 'What are ES modules',
  }, {
    answer: 'A function that has access to variables in its outer (enclosing) lexical scope, even after the outer function has returned.',
    question: 'What is a closure',
  }],
}, {
  category: 'TypeScript',
  items: [{
    answer: 'A feature in which the TypeScript compiler automatically deduces the data type of a variable or expression based on the value assigned to it, without the need for explicit type annotations.',
    question: 'What is type inference',
  }, {
    answer: 'A special return type that signals to the compiler that a function or method performs a type narrowing operation on its argument. It is defined using the `is` keyword followed by a type, typically used in the return type.',
    question: 'What is a type predicate',
  }, {
    answer: 'A feature that helps ensure all possible cases are handled when using union types, particularly with switch statements or conditional expressions.',
    question: 'What is exhaustiveness checking',
  }, {
    answer: 'The return type for functions that throw an exception, terminate execution, or have an infinite loop and no return statement.',
    question: 'What is the `never` type',
  }, {
    answer: 'The process of using TypeScript to rewrite code from newer versions of ECMAScript to older ones, typically to support older browsers.',
    question: 'What is downleveling',
  }],
}, {
  category: 'React',
  items: [{
    answer: 'A component or hook is considered this when it is idempotent, has no side effects, and does not mutate non-local values.',
    question: 'What is pure',
  }, {
    answer: 'This built-in React component enables extra development-only checks that help you find bugs early',
    question: 'What it StrictMode',
  }, {
    answer: 'This React hook lets you update the state without blocking the UI.',
    question: 'What it useTransition',
  }, {
    answer: "The process by which React creates an in-memory data-structure cache, computes the resulting differences, and then updates the browser's displayed DOM efficiently.",
    question: 'What is reconciliation',
  }, {
    answer: 'In 2017, Facebook announced this new architecture that enabled incremental rendering. It was a major improvement over the previous architecture which processed updates synchronously in a single, uninterrupted transaction.',
    question: 'What it Fiber',
  }],
}, {
  category: 'React-Query',
  items: [{
    answer: 'This hook can be used to additively "load more" data on an existing set of data and is typically used to implement the "infinite scroll" pattern.',
    question: 'What is useInfiniteQuery',
  }, {
    answer: 'One is the state of the data (pending, error or success) and the other is the state of the query function (fetching, paused or idle).',
    question: 'What are `status` and `fetchStatus`',
  }, {
    answer: 'This is the object passed to each query function and consists of the queryKey, abort signal and meta.',
    question: 'What is a QueryFunctionContext',
  }, {
    answer: "A synchronous queryClient method that can be used to immediately update a query's cached data. If the query does not exist, it will be created.",
    question: 'What is setQueryData',
  }, {
    answer: 'These are the four side effect callback options you can pass into the useMutation hook that correspond to each stage of the mutation lifecycle.',
    question: 'What is onMutate, onSuccess, onError, and onSettled',
  }],
}, {
  category: 'CSS',
  items: [{
    answer: 'This term refers to the relative weights of various rules. It determines which styles apply to an element when more than one rule could apply.',
    question: 'What is specificity'
  }, {
    answer: 'Used in CSS selectors to permit formatting based on information that is not contained in the document tree. Notated using a single colon.',
    question: 'What are pseudo-classes',
  }, {
    answer: "This refers to when a web browser engine renders content with the browser's default styles prior to loading an external CSS stylesheet. The page corrects itself as soon as the style rules are loaded and applied.",
    question: 'What is Flash Of Unstyled Content',
  },{
    answer: 'A mode used by web browsers to maintain backward compatibility with web pages designed for old web browsers, instead of strictly complying with web standards in standards mode.',
    question: 'What is quirks mode',
  }, {
    answer: "A hybrid between relative and fixed, it allows an element to act like it is relatively positioned until it's scrolled to a certain threshold, after which it becomes fixed.",
    question: 'What is position: sticky',
  }],
}, {
  category: 'Material-UI',
  items: [{
    answer: "This component lets you render its children into a DOM node that exists outside of the local DOM hierarchy. It is used internally by the Modal and Popper components.",
    question: 'What is a Portal',
  }, {
    answer: "This component narrows the user's focus to a particular element on the screen. Typically used to create modals and dialogs by adding a dimmed layer over your application.",
    question: 'What is a Backdrop',
  }, {
    answer: "This component provides users with a brief, temporary message about app processes without interrupting their activity or experience.",
    question: 'What is a Snackbar',
  }, {
    answer: "All non-utility Base UI components accept this prop for overriding their rendered HTML structure.",
    question: 'What is the slots prop',
  }, {
    answer: "The sx sizing properties (e.g. width, height) use a custom transform for the value that converts values between (0, 1] into this.",
    question: 'What is a percentage',
  }],
}]

export const doubleJeopardy = [{
  category: 'HTML',
  items: [{
    answer: '',
    question: 'What it Flux',
  }],
}, {
  category: 'Abstract Syntax Trees',
  items: [{
    answer: '',
    question: 'What it Flux',
  }],
}, {
  category: 'Client State',
  items: [{
    answer: "This architecture features actions which are sent through a central dispatcher to a store, and changes to the store are propagated back to the view. Many implementations exist, perhaps the most well-known being Redux.",
    question: 'What it Flux',
  }],
}, {
  category: 'Web Browsers',
  items: [{
    answer: '',
    question: 'What it Flux',
  }],
}, {
  category: 'WebGL',
  items: [{
    answer: '',
    question: 'What it Flux',
  }],
}]

export const finalJeopardy = [{
  category: 'Web Browser History',
  answer: 'The first popular web browser with a graphical user interface, Mosaic, was released in 1993. Accessible to non-technical people, it played a prominent role in the rapid growth of the early World Wide Web. A year later, the lead developers of Mosaic released this more polished browser, which quickly became the most-used browser until Microsoft debuted Internet Explorer in 1995, starting the browser wars.',
  question: 'What is Netscape Navigator',
}, {
  category: 'JavaScript History',
  answer: 'Originally formed in 1961, Ecma International is a nonprofit standards organization for information and communication systems headquarterd in Geneva, Switzerland and responsible for several standards, most notably ECMAScript. Though the name is no longer considered an ancronym, this is what is used to stand for.',
  question: 'What is the European Computer Manufacturers Association',
}, {
  category: 'JavaScript History',
  answer: 'The JavaScript trademark was originally issued to Sun Microsystems in 1997, and was then transferred to this corporation when they acquired Sun in 2009.',
  question: 'What is Oracle Corporation',
}]
