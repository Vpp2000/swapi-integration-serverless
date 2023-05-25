import { describe, it } from "@jest/globals";
import { VehicleService } from "../../src/services/vehicle.service";
import { EXPECTED_DATA_SWAPI, MOCKED_DYNAMO_DATA, MOCKED_SWAPI_DATA } from "../mocks/list_test.data";

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
})
