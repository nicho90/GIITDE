-- LIST ALL TRASH BINS
SELECT
    trash_bin_id,
    created,
    updated,
    description,
    filling_height,
    'CENTIMETER' AS filling_height_unit,
    capacity,
    'LITER' AS capacity_unit,
    ST_X(coordinates::geometry) AS lng,
    ST_Y(coordinates::geometry) AS lat
FROM Trash_Bins ORDER BY trash_bin_id ASC;


-- LIST ALL NEARBY TRASH BINS
SELECT
    trash_bin_id,
    created,
    updated,
    description,
    filling_height,
    'CENTIMETER' AS filling_height_unit,
    capacity,
    'LITER' AS capacity_unit,
    ST_X(coordinates::geometry) AS lng,
    ST_Y(coordinates::geometry) AS lat,
    ST_Distance(coordinates, ST_GeographyFromText('POINT(7.603001 51.969037)')) AS distance, -- Kreuzung
    'METER' AS distance_unit
FROM Trash_Bins ORDER BY distance ASC;


-- GET A TRASH BIN BY ITS ID
SELECT
    trash_bin_id,
    created,
    updated,
    description,
    filling_height,
    'CENTIMETER' AS filling_height_unit,
    capacity,
    'LITER' AS capacity_unit,
    ST_X(coordinates::geometry) AS lng,
    ST_Y(coordinates::geometry) AS lat
FROM Trash_Bins WHERE trash_bin_id=1;


-- EDIT A TRASH BIN BY ITS ID
UPDATE Trash_Bins SET
    updated=now(),
    description='GEO-1',
    filling_height=60,
    capacity=60,
    coordinates='POINT(7.595934 51.969148)'
WHERE trash_bin_id=1;


-- ADD A NEW TRASH BIN
INSERT INTO Trash_Bins (description, filling_height, capacity, coordinates) VALUES ('TEST', 0, 0, 'POINT(0.0 0.0)');


-- DELETE A TRASH BIN BY ITS ID
DELETE FROM Trash_Bins WHERE trash_bin_id=4;
