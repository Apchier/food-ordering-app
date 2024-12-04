import { NotFoundException } from '@/server/lib/error.exception';
import { storeRepository } from './store.repository';
import type {
    CreateStoreRequest,
    StoreWithRelations,
    UpdateStoreRequest,
} from './store.model';
import { validateSchema } from '@/server/service';
import { createStoreSchema, updateStoreSchema } from './store.validation';
import {
    toStoreResponse,
    toStoreWithRelationsResponse,
} from '@/server/utils/response/store-api-response';
import type { Store } from '@prisma/client';

export const storeService = {
    getAll: async (): Promise<StoreWithRelations[]> => {
        const data = await storeRepository.findMany();

        const stores = data?.map(store => toStoreWithRelationsResponse(store));

        return stores!;
    },

    getById: async (id: string): Promise<StoreWithRelations> => {
        const store = await storeRepository.findUniqueId(id);

        if (!store) {
            throw new NotFoundException('Store not found`');
        }

        return toStoreWithRelationsResponse(store);
    },

    create: async (request: CreateStoreRequest): Promise<Store> => {
        const validatedRequest: CreateStoreRequest = validateSchema(
            createStoreSchema,
            request,
        );

        const store = await storeRepository.insertOnce(validatedRequest, '');

        return toStoreResponse(store);
    },

    update: async (id: string, request: UpdateStoreRequest): Promise<Store> => {
        await storeService.getById(id);

        const validatedRequest: UpdateStoreRequest = validateSchema(
            updateStoreSchema,
            request,
        );

        const store = await storeRepository.updateOnce(id, validatedRequest);

        return toStoreResponse(store);
    },

    delete: async (id: string): Promise<{ id: string }> => {
        await storeService.getById(id);

        await storeRepository.deleteOnce(id);

        return { id };
    },
};
