<!-- README.md for a Full-Stack WDP Compress 2 Project -->

<h1 align="center">🗜️ WDP Compress 2</h1>
<p align="center">
  A full‑stack image compression & sharing platform featuring a GraphQL API, real‑time updates via WebSockets, and a React.js frontend.
</p>
<hr>

<h2>📌 Overview</h2>
<p>
  <strong>WDP Compress 2</strong> consists of two main parts:
  <ul>
    <li><strong>Backend (myapp/):</strong> Node.js + Express + GraphQL + WebSocket server to handle image uploads, compression, metadata storage, and real‑time notifications.</li>
    <li><strong>Frontend (myreactapp/):</strong> React.js SPA that lets users upload images, view compressed results, and receive live status updates.</li>
  </ul>
</p>

<h2>📁 Folder Structure</h2>
<pre>
WDP Compress 2/
│
├── myapp/                     # Backend
│   ├── models/                # Mongoose models (Image, User, etc.)
│   ├── resolvers/             # GraphQL resolver functions
│   ├── .env                   # Environment variables (not committed)
│   ├── backup.js              # Utility script for backups
│   ├── db.js                  # MongoDB connection setup
│   ├── index.js               # Entry point (GraphQL + WebSocket server)
│   ├── schema.js              # GraphQL type definitions
│   ├── websocketserver.js     # WebSocket server logic
│   └── package.json           # Backend dependencies & scripts
│
├── myreactapp/                # Frontend
│   ├── public/                # Static assets (index.html, favicon, etc.)
│   ├── src/                   # React source code
│   ├── colors.txt             # Brand color palette
│   ├── package.json           # Frontend dependencies & scripts
│   └── README.md              # Frontend‑specific README (optional)
│
└── README.md                  # ← You are here!
</pre>

<h2>⚙️ Tech Stack</h2>
<table>
  <tr><th>Layer</th><th>Technologies</th></tr>
  <tr><td>Backend</td><td>Node.js, Express, GraphQL (Apollo), Mongoose, WebSockets</td></tr>
  <tr><td>Frontend</td><td>React.js, Axios/WebSocket client, CSS</td></tr>
  <tr><td>Database</td><td>MongoDB</td></tr>
</table>

<hr>

<h2>🧑‍💻 Prerequisites</h2>
<ul>
  <li>Node.js & npm installed</li>
  <li>MongoDB instance (local or Atlas)</li>
  <li>Git installed</li>
</ul>

<h2>🚀 Installation & Running Locally</h2>

<h3>1. Clone the repo</h3>
<pre><code>git clone https://github.com/your-username/WDP-Compress-2.git
cd "WDP Compress 2"</code></pre>

<h3>2. Setup & Run Backend</h3>
<ol>
  <li><strong>Install dependencies:</strong>
    <pre><code>cd myapp
npm install</code></pre>
  </li>
  <li><strong>Create <code>.env</code> file in <code>myapp/</code>:</strong>
    <pre><code>MONGODB_URI=your_mongodb_connection_string
PORT=4000</code></pre>
  </li>
  <li><strong>Start the server:</strong>
    <pre><code>npm run start</code></pre>
    <p>Backend GraphQL & WebSocket server will run at <code>http://localhost:4000/graphql</code></p>
  </li>
</ol>

<h3>3. Setup & Run Frontend</h3>
<ol>
  <li><strong>Install dependencies:</strong>
    <pre><code>cd ../myreactapp
npm install</code></pre>
  </li>
  <li><strong>Configure API endpoint (if needed):</strong>  
    Update <code>src/config.js</code> or environment variables to point to <code>http://localhost:4000/graphql</code>.
  </li>
  <li><strong>Start the React app:</strong>
    <pre><code>npm run dev</code></pre>
    <p>Frontend will open at <code>http://localhost:3000</code> (or your default React dev URL).</p>
  </li>
</ol>

<hr>

<h2>📦 Usage</h2>
<ul>
  <li>Upload an image → Backend compresses & stores it.</li>
  <li>Frontend displays compression progress in real time via WebSockets.</li>
  <li>View & download the compressed image once ready.</li>
</ul>

<hr>

<h2>🛠️ Scripts</h2>
<table>
  <tr><th>Directory</th><th>Script</th><th>Description</th></tr>
  <tr><td><code>myapp</code></td><td><code>npm run start</code></td><td>Launch GraphQL & WebSocket server</td></tr>
  <tr><td><code>myreactapp</code></td><td><code>npm run dev</code></td><td>Start React development server</td></tr>
</table>

<hr>

<h2>⚡ Future Enhancements</h2>
<ul>
  <li>✅ User authentication & authorization</li>
  <li>📈 Admin dashboard for analytics</li>
  <li>🔄 Auto-scaling compression workers</li>
  <li>🌐 Deployment scripts (Docker, CI/CD)</li>
</ul>

<hr>

<h2>📄 License</h2>
<p>This project is open-source under the <a href="LICENSE">MIT License</a>.</p>

<hr>

<h2>✍️ Author</h2>
<p>
  <strong>Md Fardeen Akbar</strong><br>
  CSIT Student & Full-Stack Developer<br>
  🔗 <a href="https://github.com/MdFardeenAkbar">GitHub</a> • 📫 <a href="mailto:fardeenakbar456@gmail.com">your-email@example.com</a>
</p>
