import sqlite3
from sqlite3 import Error

# Just ignore this big bit of data,
# but you can also read this if you want to
class Database():

    def __init__(self, filename="building.db") -> None:
        '''
            Upon call of Database instance, it will load the sqlite db file.
            Default is located on root.
        '''

        self.conn = None
        self.cursor = None

        try:
            self.conn = sqlite3.connect(filename)
            self.cursor = self.conn.cursor()
        except Error as e:
            print(e)

    def execute_query(self, query):
        '''
            This will take a query: like "SELECT * FROM building"
            and return the results in list of tuples
        '''

        cur = self.conn.cursor()
        cur.execute(query)

        rows = cur.fetchall()
        return rows

    def get_tables(self):
        '''
            Will return all the tables in the database.
            By the way, there's only three tables in the database.

            building, sensors, accelerometer

            building -> contains the building list along with their info
            sensors -> contains all the sensor list and info
            accelerometer -> contains the x,y,z acceleration and data info over time
        '''
        self.cursor = self.conn.cursor()

        self.cursor.execute("SELECT name FROM sqlite_master WHERE type='table';")

        return self.cursor.fetchall()

    def get_table_scheme(self, table_name):
        rows = self.execute_query(f"PRAGMA table_info({table_name});")
        ret = {}
        for d in rows:
            ret[d[1]] = d[2]
        return ret

    def combine_schema_data(self, schema, data):
        '''
            This will take the schema data from the 'get_table_scheme' function
            and results from 'execute_query' of the same table.
        '''
        ret = []

        if len(data) > 0:
            if len(schema) != len(data[0]):
                raise(Exception("Schema and Data does not fit"))
            _s = list(schema.keys())
            for d in data:
                _r = {}
                for s in range(len(_s)):
                    _r[_s[s]] = d[s]

                ret.append(_r)

        return ret


if __name__ == '__main__':

    # These are the row title of each table.
    # These don't actually do anything on the code.
    # I just put them here for your reading purpose

    building = """building (
                    id -> integer PRIMARY KEY,
                    name -> text NOT NULL,
                    storeys -> integer,
                    year_built -> integer,
                    city -> text,
                    type -> text,
                    structural_framing -> text
                );
            """

    sensors = """ sensors (
                    id -> integer PRIMARY KEY,
                    building_id -> integer NOT NULL,
                    floor -> integer NOT NULL,
                    name -> text,
                    room_height -> integer,
                    description -> text,
                    FOREIGN KEY (building_id) REFERENCES building (id)
                );
            """

    accelerometer = """ accelerometer (
                            id -> integer PRIMARY KEY,
                            sensor_id -> integer NOT NULL,
                            building_id -> integer NOT NULL,
                            x -> real NOT NULL,
                            y -> real NOT NULL,
                            z -> real NOT NULL,
                            year -> integer NOT NULL,
                            month -> integer NOT NULL,
                            date -> integer NOT NULL,
                            hour -> integer NOT NULL,
                            minute -> integer NOT NULL,
                            second -> real NOT NULL,
                            description -> text,
                            FOREIGN KEY (sensor_id) REFERENCES sensors (id)
                            FOREIGN KEY (building_id) REFERENCES building (id)
                        );
                    """


    # We initialize the database
    db = Database()

    # This will return all of the table names
    print()
    print(db.get_tables())

    # This will get all the row title of a table.
    # In this example, it took all the row title of building table
    print("\nBuilding: ", end="")
    print(db.get_table_scheme("building"))

    # This would return a tuple of data with no label,
    # which is useful if you know what each value represents
    print("\nGetting all sensors without label")
    print(db.execute_query("SELECT * FROM sensors"))

    # This would return a tuple of data with label,
    # This is only useful if your returning a * SELECT, else, this is error
    print("\nGetting all sensors with label")
    data = db.execute_query("SELECT * FROM sensors")
    schema = db.get_table_scheme("sensors")
    print(db.combine_schema_data(schema, data))

    # This would filter the results
    print("\nGetting all accelerometer data from sensor 3 [the -3th floor]")
    data = db.execute_query("SELECT * FROM accelerometer WHERE (sensor_id=3 AND date=20 AND hour=13)")
    schema = db.get_table_scheme("accelerometer")
    print(db.combine_schema_data(schema, data)[:5]) # Will only return the first 5

    # This would get only specific schema from the table
    print("\nGetting all accelerometer x,y,z data only")
    data = db.execute_query("SELECT x,y,z FROM accelerometer")
    print(data[:5]) # Will only return the first 5


