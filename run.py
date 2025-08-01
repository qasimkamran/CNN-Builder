from backend import create_app

app = create_app()

if __name__ == "__main__":
    # enable threading so SSE and HTTP endpoints run concurrently
    app.run(host='0.0.0.0', port=5000, debug=True, threaded=True)

