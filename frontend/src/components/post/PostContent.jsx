import React from 'react';

const post = {
  content: `
    <p>Welcome to the 40-day React roadmap. In this guide, we will explore the core concepts that make React the most popular UI library in the world.</p>
    
    <h2>1. Understanding Component Architecture</h2>
    <p>React is all about <strong>components</strong>. Think of them as custom HTML elements that you can reuse across your application. Here is a quick breakdown of what we'll cover:</p>
    <ul>
      <li>JSX Syntax and Expressions</li>
      <li>Props vs State</li>
      <li>The Component Lifecycle</li>
    </ul>

    <h2>2. Writing Clean Code</h2>
    <p>One of the best parts of React is how it handles logic. Let's look at a simple functional component:</p>
    <pre><code>function Welcome() {
  const [count, setCount] = React.useState(0); // orange number
  
  // This comment should look pale green
  const increment = () => setCount(prev => prev + 1);

  return (
    &lt;button onClick={increment}&gt;
      Clicked {count} times
    &lt;/button&gt;
  );
}</code></pre>

    <h2>3. Learning Schedule</h2>
    <p>Here is how you should split your time to master the library in 40 days:</p>
    <table>
      <thead>
        <tr>
          <th>Phase</th>
          <th>Days</th>
          <th>Focus Area</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Basics</td>
          <td>1-10</td>
          <td>JSX, Props, and State Management</td>
        </tr>
        <tr>
          <td>Hooks</td>
          <td>11-25</td>
          <td>useEffect, useContext, and Custom Hooks</td>
        </tr>
        <tr>
          <td>Advanced</td>
          <td>26-40</td>
          <td>Routing, Redux, and Performance Tuning</td>
        </tr>
      </tbody>
    </table>

    <blockquote>
      "React is not a framework; it's a library for building user interfaces. It gives you the freedom to choose your own tools."
    </blockquote>

    <h2>4. Visualizing Data Flow</h2>
    <p>Understanding how data flows from parent to child is crucial for success.</p>
    <img src="https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80&w=1000" alt="React Concept Map" class="rounded-2xl shadow-xl" />
  `
};



const PostContent = () => {
  return (
    <article className="bg-white p-8 max-w-5xl mx-auto min-h-screen border border-slate-200 shadow-sm mt-10 rounded-xl">
      
      {/* Article Header */}
      <h1 className="mb-4 text-4xl font-bold text-slate-900 tracking-tight leading-tight">
        How to learn React in 40 days
      </h1>

      {/* Meta Information */}
      <div className="mb-8 flex items-center gap-2 text-sm text-slate-500 border-b pb-6">
        <span>By</span>
        <a href="#" className='flex gap-2 items-center'>
            <img src="https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80&w=1000" alt="React Concept Map" class="rounded-2xl shadow-xl" alt="" 
            className='w-4 h-4 rounded-full '
             />
            <span className="font-semibold text-slate-800">Abhishek Kumar Singh</span>
        </a>
        <span className="text-slate-300">•</span>
        <span>January 26, 2026</span>
      </div>

      {/* Rendered HTML Content */}
      <div
        className="prose prose-slate max-w-none 
          prose-headings:text-slate-900 
          prose-blockquote:border-l-indigo-500 
          prose-img:rounded-2xl 
          prose-code:before:content-none 
          prose-code:after:content-none"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />

    </article>
  );
};

export default PostContent;