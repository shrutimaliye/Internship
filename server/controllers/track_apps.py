import psutil
import time
from datetime import datetime, timedelta
from pymongo import MongoClient
import sys

# MongoDB connection (replace with your credentials)
mongo_url = 'mongodb+srv://shrutiM:ElectronP1@cluster0.j2psvez.mongodb.net/Internship_Project'
client = MongoClient(mongo_url)

def get_running_processes():
  running_processes = []
  for process in psutil.process_iter(['pid', 'name', 'create_time']):
    running_processes.append((process.info['pid'], process.info['name'], process.info['create_time']))
  return running_processes

def track_application_usage(mac_address):
  db = client[mac_address]
  collection = db.application_usage
  
  while True:
    running_processes = get_running_processes()
    current_time = datetime.now()
    
    for pid, name, create_time in running_processes:
      start_time = datetime.fromtimestamp(create_time)
      duration_seconds = (current_time - start_time).total_seconds()
      duration_minutes = duration_seconds / 60  # Convert to minutes
      
      entry = {
          'timestamp': current_time.strftime('%Y-%m-%d %H:%M:%S'),
          'pid': pid,
          'name': name,
          'duration_minutes': duration_minutes
      }
      collection.insert_one(entry)
    
    # Print usage data every 5 minutes
    if current_time.minute % 5 == 0:  # Check if minute is divisible by 5 (every 5 minutes)
      print(f"\nApplication usage data for '{mac_address}' at {current_time.strftime('%H:%M:%S')}")
      # ... (logic to retrieve and print usage data from collection - implemented below)
    
    time.sleep(300)  # Track every 5 minutes (300 seconds)

if __name__ == "__main__":
  if len(sys.argv) != 2:
    print("Usage: python track_apps.py <mac_address>")
    sys.exit(1)
  
  mac_address = sys.argv[1]
  track_application_usage(mac_address)