const { getMACAddress } = require('../models/macadd');
const { MongoClient } = require('mongodb');
const AppUsage = require('../models/appUsage');
const path = require('path')
const { spawn } = require('child_process');
let trackingProcess;

const MONGODB_URI = "mongodb+srv://shrutiM:ElectronP1@cluster0.j2psvez.mongodb.net/";

exports.checkMACAddress = async (req, res) => {
  const { macAddress } = req.body;
  try {
    const foundMACAddress = await getMACAddress(macAddress);
    if (foundMACAddress) {
      res.json({ found: true });
    } else {
      res.json({ found: false });
    }
  } catch (error) {
    console.error('Error checking MAC address:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.startTracking = async (req, res) => {
  const { macAddress } = req.body;
  console.log(macAddress);
  if (trackingProcess) {
    return res.status(400).json({ message: 'Tracking already active' });
  }

  const pythonScriptPath = path.join(__dirname, 'track_apps.py');

  trackingProcess = spawn('python', [pythonScriptPath, macAddress]);

  trackingProcess.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`);
  });

  trackingProcess.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`);
  });

  trackingProcess.on('close', (code) => {
    console.log(`child process exited with code ${code}`);
    trackingProcess = null;
  });

  res.json({ message: 'Tracking started' });
};


exports.stopTracking = async (req, res) => {
  if (!trackingProcess) {
    return res.status(400).json({ message: 'Tracking is not active' });
  }

  // Handle errors that occur during the kill operation
  try {
    trackingProcess.kill('SIGINT');
  } catch (err) {
    console.error('Error occurred while trying to kill the tracking process:', err);
    return res.status(500).json({ error: 'Error stopping tracking process' });
  }

  // Wait for the process to exit
  trackingProcess.on('exit', (code, signal) => {
    console.log(`Tracking process exited with code ${code} and signal ${signal}`);
    trackingProcess = null; // Reset the reference to the tracking process
    res.json({ message: 'Tracking stopped' });
  });

  // If the process doesn't terminate within a certain timeout, force kill it
  setTimeout(() => {
    if (trackingProcess) {
      try {
        trackingProcess.kill('SIGKILL');
      } catch (err) {
        console.error('Error occurred while forcefully killing the tracking process:', err);
      } finally {
        trackingProcess = null; // Reset the reference to the tracking process
      }
    }
  }, 5000); // 5 seconds timeout

  console.log('Stopping tracking...');
};

exports.getTracking = async (req, res) => {
  console.log(req.body);
  const {macAddress} = req.body;
  console.log(macAddress);
  const client = new MongoClient(MONGODB_URI);
  try {
    await client.connect();

    const database = client.db(macAddress);
    const collection = database.collection('application_usage');

    // Fetch data
    const data = await collection.find().toArray();
    console.log(data)
    res.json(data);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  } finally {
    // Close the database connection
    await client.close();
  }
};



