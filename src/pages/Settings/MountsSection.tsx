import { Button, Card, CardBody } from '@heroui/react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { message } from '@tauri-apps/plugin-dialog'
import { SquareIcon } from 'lucide-react'
import { fetchMountList } from '../../../lib/rclone/api'
import rclone from '../../../lib/rclone/client'
import BaseSection from './BaseSection'

export default function MountsSection() {
    const queryClient = useQueryClient()

    const { data: mountList, isLoading } = useQuery({
        queryKey: ['mount', 'list'],
        queryFn: fetchMountList,
        refetchInterval: 5000,
    })

    const unmountMutation = useMutation({
        mutationFn: async (mountPoint: string) => {
            await rclone('/mount/unmount', {
                params: {
                    query: {
                        mountPoint: mountPoint,
                    },
                },
            })
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['mount', 'list'] })
            message('Unmounted successfully', { title: 'Success', kind: 'info' })
        },
        onError: async (error) => {
            console.error('Failed to unmount:', error)
            await message(error instanceof Error ? error.message : 'Unknown error occurred', {
                title: 'Unmount Failed',
                kind: 'error',
            })
        },
    })

    return (
        <BaseSection header={{ title: 'Mounts' }}>
            <div className="flex flex-col gap-2.5 px-4 pb-10">
                {isLoading && <div className="text-center opacity-50">Loading mounts...</div>}

                {!isLoading && (!mountList || mountList.length === 0) && (
                    <div className="flex flex-col items-center justify-center opacity-50 py-10 gap-2">
                        <p>No active mounts found.</p>
                    </div>
                )}

                {mountList?.map((mount) => (
                    <Card key={mount.MountPoint} shadow="sm" className="border border-divider">
                        <CardBody>
                            <div className="flex items-center justify-between">
                                <div className="flex flex-col gap-1">
                                    <div className="flex items-center gap-2">
                                        <span className="font-semibold">{mount.Fs}</span>
                                    </div>
                                    <span className="text-small text-default-500 font-mono">
                                        {mount.MountPoint}
                                    </span>
                                </div>
                                <Button
                                    color="danger"
                                    variant="flat"
                                    isIconOnly
                                    onPress={() => unmountMutation.mutate(mount.MountPoint)}
                                    isLoading={unmountMutation.isPending}
                                >
                                    <SquareIcon className="w-4 h-4" />
                                </Button>
                            </div>
                        </CardBody>
                    </Card>
                ))}
            </div>
        </BaseSection>
    )
}
