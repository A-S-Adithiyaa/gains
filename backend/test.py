import os
import sys
import subprocess
import io
from pydub import AudioSegment
from moviepy.editor import *
from PIL import Image
from flask import Flask, request, jsonify, send_file
from flask_cors import CORS

sys.path.append("Wav2Lip")

from inference import main

# Function to create video clip from image and audio file
def create_video_clip(image_path, audio_path):
    audio = AudioFileClip(audio_path)
    clip = ImageClip(image_path).set_duration(audio.duration)
    return clip

# Define function to add text to image
def add_text_to_image(image, text):
    draw = ImageDraw.Draw(image)
    font = ImageFont.truetype("arial.ttf", 24)
    draw.text((10, 10), text, fill="white", font=font)
    return image

# List to store video clips for each pair
video_clips = []

# Define variables and functions from your provided code snippet
API_URL_TEXT = "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-xl-base-1.0"
API_URL_AUDIO = "https://api-inference.huggingface.co/models/facebook/fastspeech2-en-ljspeech"
headers = {"Authorization": "Bearer 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"}

def query_text(payload):
    response = requests.post(API_URL_TEXT, headers=headers, json=payload)
    return response.content

def query_audio(payload):
    response = requests.post(API_URL_AUDIO, headers=headers, json=payload)
    return response.content

# Load required libraries
import requests
from PIL import Image, ImageDraw, ImageFont

# Query API for each text and save as images
# texts = [
#     "Cricket is a bat-and-ball game played between two teams of eleven players on a field at the centre of which is a 22-yard (20-metre) pitch with a wicket at each end, each comprising two bails balanced on three stumps",
#     "Two players from the batting team (the striker and nonstriker) stand in front of either wicket, with one player from the fielding team (the bowler) bowling the ball towards the striker's wicket from the opposite end of the pitch",
#     "The striker's goal is to hit the bowled ball and then switch places with the nonstriker, with the batting team scoring one run for each exchange",
#     "Runs are also scored when the ball reaches or crosses the boundary of the field or when the ball is bowled illegally.",
#     "The fielding team tries to prevent runs from being scored by dismissing batters (so they are 'out')"
# ]

# texts = [
#     "Cricket is a bat-and-ball game played between two teams of eleven players on a field at the centre of which is a 22-yard (20-metre) pitch with a wicket at each end, each comprising two bails balanced on three stumps",    
# ]

def make_video(texts):
    print("inside make video")
    
    video_clips.clear()

    try:
        images = []
        audios = []
        for text in texts:
            image_bytes = query_text({"inputs": text})
            audio_bytes = query_audio({"inputs": text})
            
            image = Image.open(io.BytesIO(image_bytes))
            image_with_text = add_text_to_image(image, text)
            images.append(image_with_text)
            
            audios.append(io.BytesIO(audio_bytes))

        print("added text to image")

        # Write the list of image files and corresponding audio durations to a temp file
        for i, (image, audio) in enumerate(zip(images, audios)):
            image_path = f"image_file_{i}.png"
            audio_path = f"audio_file_{i}.wav"
            
            # Save image
            image.save(image_path)
            
            # Save audio
            wav_format=AudioSegment.from_file(audio)
            wav_format.export(f"{audio_path}", format='wav')

            video_clip = create_video_clip(image_path, audio_path)
            video_clips.append(video_clip)

        print("Saved images and audio")

        main(number_of_sentences=len(texts))

        print("outside main function")
                
        # Concatenate video clips
        main_video = concatenate_videoclips(video_clips)

        # Clean up temporary files
        for i in range(len(images)):
            os.remove(f"image_file_{i}.png")
            os.remove(f"audio_file_{i}.wav")

        # Number of overlay video files
        overlay_files = len(texts)

        # List to store overlay video clips
        overlay_clips = []

        # Loop through overlay files and create VideoFileClip objects
        for file_index in range(overlay_files):
            overlay_clip = VideoFileClip(f"output_avatar_{file_index}.mp4")
            overlay_clip = overlay_clip.resize(width=main_video.w // 4)  # Adjust size as needed
            
            # Calculate position for overlay video at bottom right
            overlay_x = main_video.w - overlay_clip.w
            overlay_y = main_video.h - overlay_clip.h
            
            # Set position for overlay clip
            overlay_clip = overlay_clip.set_position((overlay_x, overlay_y))
            
            overlay_clips.append(overlay_clip)

        # Concatenate overlay clips one after the other
        final_clip = concatenate_videoclips(overlay_clips)

        # Composite the final clip onto the main video
        composite_video = CompositeVideoClip([main_video, final_clip])

        # os.chdir("../public")
        # Write the composite video to a file
        composite_video.write_videofile("TutorialVideo.mp4", codec="libx264", fps=main_video.fps)

        # os.chdir("../backend")


        return "True"
    except:
        return "False"
    

app = Flask(__name__)
CORS(app)

# @app.route('/generate_learn_video', methods=['POST'])
# def generate_learn_video():
#     data=request.get_json()
#     summary=data['context']
#     print("Context", summary)
#     # summarized_text = summarizer(context, summary_model, summary_tokenizer)
#     # summary=get_summary_in_points(summarized_text)
#     # print(summary)
#     return jsonify(make_video(summary))
#     # video_path = 'output_with_overlay.mp4'  # Update with the path to your video file
#     # return send_file(video_path, mimetype='video/mp4')


@app.route("/generate_learn_video", methods=["GET", "POST"])
def generate_learn_video():
    data=request.get_json()
    summary=data['context']
    make_video(summary)
    video=send_file("./TutorialVideo.mp4")  

    return video

app.run(debug=True, port=5005)
