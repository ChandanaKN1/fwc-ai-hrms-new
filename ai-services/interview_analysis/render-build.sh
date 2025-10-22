#!/usr/bin/env bash

# Update and install system dependencies
apt-get update
apt-get install -y portaudio19-dev

# Install Python dependencies
pip install --upgrade pip
pip install -r requirements.txt
