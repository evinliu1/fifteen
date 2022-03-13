## Setup Instructions
1. `pip3 install -r requirements.txt`
2. Create a `.env` file in the top-level directory and enter the following as its contents:
```
export TMDB_API_KEY="<YOUR API KEY>"
export DATABASE_URL="<YOUR POSTGRESQL DB URL>"
```


## To run the app
1. Run `python3 routes.py`

add, delete, edit comments
https://youtu.be/N8kYlimhuLw

useEffect with fetch function
https://youtu.be/k0WnY0Hqe5c

Helped with getting started
https://reactjs.org/docs/hooks-effect.html

Benefits of useEffect: lets us express different kinds of side effects after a component renders

Error:
1. Traceback (most recent call last):
  File "/Users/user/milestone3-snesmith5/routes.py", line 136, in <module>
    app.run(
  File "/Library/Frameworks/Python.framework/Versions/3.10/lib/python3.10/site-packages/flask/app.py", line 920, in run
    run_simple(t.cast(str, host), port, self, **options)
  File "/Library/Frameworks/Python.framework/Versions/3.10/lib/python3.10/site-packages/werkzeug/serving.py", line 984, in run_simple
    s.bind(server_address)
OSError: [Errno 48] Address already in use
Fix: https://stackoverflow.com/questions/34457981/trying-to-run-flask-app-gives-address-already-in-use 
Simply changing the route number in app.run 

2. AttributeError: 'NoneType' object has no attribute 'drivername'
Referring to line 50 in routes.py -->  user = User.query.filter_by(username=username).first()


