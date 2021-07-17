
# A very simple Flask Hello World app for you to get started with...

from flask import Flask
from flask import request
import json
import time
from database import Database
import sqlite3 as sql
from flask import jsonify, render_template

import logging
logging.basicConfig(filename='./myapp.log', level=logging.DEBUG,
                    format='%(asctime)s %(levelname)s %(name)s %(message)s\n\n')
logger=logging.getLogger(__name__)

app = Flask(__name__)

# flask_app.py

@app.after_request # blueprint can also be app~~
def after_request(response):
    header = response.headers
    header['Access-Control-Allow-Origin'] = '*'
    return response

@app.route("/", methods=["POST", "GET"])
def home():

    return jsonify(["Hello World from Terra-Tracer"])

@app.route('/building/<building>')
def get_building_data(building):

    try:
        with app.app_context():
            db = Database()

            query = f"SELECT * FROM building WHERE (id={building})"
            res = db.execute_query(query)
            schema = db.get_table_scheme('building')

            return jsonify(db.combine_schema_data(schema, res))
    except:
        logger.exception("Error Here")

    return jsonify(["Error Intercepted"])


@app.route('/building')
def get_building_all():

    try:
        with app.app_context():
            db = Database()

            query = f"SELECT * FROM building"
            res = db.execute_query(query)
            schema = db.get_table_scheme('building')

            return jsonify(db.combine_schema_data(schema, res))
    except:
        logger.exception("Error Here")

    return jsonify(["Error Intercepted"])


@app.route('/building/<building>/sensors')
def get_building_sensors(building):

    try:
        with app.app_context():
            db = Database()

            query = f"SELECT * FROM sensors WHERE (building_id={building})"
            res = db.execute_query(query)

            schema = db.get_table_scheme('sensors')

            return jsonify(db.combine_schema_data(schema, res))
    except:
        logger.exception("Error Here")

    return jsonify(["Error Intercepted"])

@app.route('/sensors/<sensor>')
def get_sensor_info(sensor):

    try:
        with app.app_context():
            db = Database()

            query = f"SELECT * FROM sensors WHERE (id={sensor})"
            res = db.execute_query(query)

            schema = db.get_table_scheme('sensors')

            return jsonify(db.combine_schema_data(schema, res))
    except:
        logger.exception("Error Here")

    return jsonify(["Error Intercepted"])


@app.route('/sensors/<sensor>/<month_date>')
def get_sensor_data(sensor,month_date):

    try:
        with app.app_context():
            db = Database()

            query = f"SELECT * FROM accelerometer WHERE (sensor_id={sensor} AND month={month_date[:2]} AND date={month_date[2:]})"
            res = db.execute_query(query)

            schema = db.get_table_scheme('accelerometer')

            return jsonify(db.combine_schema_data(schema, res))
    except:
        logger.exception("Error Here")

    return jsonify(["Error Intercepted"])

@app.route('/sensors/<sensor>/<month_date>/raw')
def get_sensor_rawdata(sensor,month_date):

    try:
        with app.app_context():
            db = Database()

            query = f"SELECT x,y,z,hour,minute,dx,dy,dz,dave FROM accelerometer WHERE (sensor_id={sensor} AND month={month_date[:2]} AND date={month_date[2:]})"
            res = db.execute_query(query)

            schema = db.get_table_scheme('accelerometer')

            return jsonify(res)
    except:
        logger.exception("Error Here")

    return jsonify(["Error Intercepted"])

@app.route('/sensors/<sensor>/<month_date>/<start_hour>/<end_hour>/raw')
def get_sensor_rawdata_hour(sensor,month_date,start_hour,end_hour):

    try:
        with app.app_context():
            db = Database()

            query = f"SELECT x,y,z,hour,minute,dx,dy,dz,dave FROM accelerometer WHERE (sensor_id={sensor} AND month={month_date[:2]} AND date={month_date[2:]} AND hour>={start_hour} AND hour<{end_hour})"
            res = db.execute_query(query)

            schema = db.get_table_scheme('accelerometer')

            return jsonify(res)
    except:
        logger.exception("Error Here")

    return jsonify(["Error Intercepted"])



