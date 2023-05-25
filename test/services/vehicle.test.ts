import { describe, it } from "@jest/globals";
import { VehicleService } from "../../src/services/vehicle.service";
import {
  EXPECTED_DATA_SWAPI,
  MOCK_VEHICLE_CREATION,
  MOCKED_DYNAMO_DATA,
  MOCKED_SWAPI_DATA,
} from "../mocks/list_test.data";
import { HttpError } from "../../src/errors/http_error";

describe("Vehicles", () => {
  it("test_list_all", async () => {
    const mockDynamoClient = {
      listAll: jest.fn(() => MOCKED_DYNAMO_DATA)
    }

    const mockSwapiClient = {
      getAll: jest.fn(() => MOCKED_SWAPI_DATA)
    }

    const vehicleService = new VehicleService(mockSwapiClient as any, mockDynamoClient as any);
    const data = await vehicleService.getAll();
    const expectedData = [
      ...EXPECTED_DATA_SWAPI
      ,...MOCKED_DYNAMO_DATA
    ]

    expect(data).toBeDefined();
    expect(data.sort()).toEqual(expectedData.sort());
  })

  it("test_creation_duplicated", async () => {
    const mockDynamoClient = {
      getElementByUniqueKey: jest.fn((MOCK_VEHICLE_CREATION) => [{
        key: "some value"
      }])
    }

    const mockSwapiClient = {
      getAll: jest.fn(() => MOCKED_SWAPI_DATA)
    }

    const vehicleService = new VehicleService(mockSwapiClient as any, mockDynamoClient as any);
    await expect(async () =>
      vehicleService.createVehicle(MOCK_VEHICLE_CREATION)
    ).rejects.toThrow(HttpError)
  })

  it("test_when_vehicle_is_not_found", async () => {
    const object = undefined;
    const mockDynamoClient = {
      getElementByPrimaryKey: jest.fn("SOME_ID" as any).mockReturnValue(object)
    }

    const mockSwapiClient = {
      getAll: jest.fn(() => MOCKED_SWAPI_DATA)
    }

    const vehicleService = new VehicleService(mockSwapiClient as any, mockDynamoClient as any);
    await expect(async () =>
      vehicleService.getVehicleById("SOME_ID")
    ).rejects.toThrow(HttpError)

  })
})
